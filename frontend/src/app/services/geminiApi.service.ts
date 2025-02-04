import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {

  private geminiApiKey: string;
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.geminiApiKey = environment.geminiApiKey;
    this.urlApi = environment.urlApi;
  }

  gerarProva(provaData: any): Observable<any> {
    const url = `${this.urlApi}${this.geminiApiKey}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [
        {
          parts: [
            {
              text: JSON.stringify({
                ...provaData,
                language: "PT-BR",
                observacao: "Gere a prova, não sugira nada",
                exemploResposta: `{
                  "nomeProva": "",
                  "temaProva": "",
                  "formatoProva": "",
                  "notaMaximaProva": 0,
                  "turmaProva": "",
                  "disciplina": "",
                  "quantidadeQuestoes": 0,
                  "questoes": [
                    {
                      "texto": "",
                      "respostas": {
                        "A": "",
                        "B": "",
                        "C": "",
                        "D": ""
                      },
                      "respostaCorreta": ""
                    },
                    {
                      "texto": "",
                      "respostas": {
                        "A": "",
                        "B": "",
                        "C": "",
                        "D": ""
                      },
                      "respostaCorreta": ""
                    }
                  ]
                }`,
                responseSchema: {
                  description: "Prova de Física",
                  type: "object",
                  properties: {
                    nomeProva: { type: "string" },
                    temaProva: { type: "string" },
                    formatoProva: { type: "string" },
                    notaMaximaProva: { type: "integer" },
                    turmaProva: { type: "string" },
                    disciplina: { type: "string" },
                    quantidadeQuestoes: { type: "integer" },
                    questoes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          texto: { type: "string" },
                          respostas: {
                            type: "object",
                            properties: {
                              A: { type: "string" },
                              B: { type: "string" },
                              C: { type: "string" },
                              D: { type: "string" }
                            }
                          },
                          respostaCorreta: { type: "string" }
                        },
                        required: ["texto", "respostas", "respostaCorreta"]
                      }
                    }
                  },
                  required: ["nomeProva", "temaProva", "formatoProva", "notaMaximaProva", "turmaProva", "disciplina", "quantidadeQuestoes", "questoes"]
                }
              })
            }
          ]
        }
      ],
      generationConfig: { 
        "response_mime_type": "application/json"
      }
    };

    return this.http.post<any>(url, body, { headers }).pipe(
      map((response: any) => {
        const generatedText = response?.candidates[0]?.content?.parts[0]?.text || '';
        const jsonResponse = this.parseGeneratedText(generatedText);
        return jsonResponse;
      })
    );
  }

  private parseGeneratedText(generatedText: string) {
    try {
      const cleanText = generatedText.replace(/^```json\n|\n```$/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      return { error: "Não foi possível gerar a prova, verifique os dados informados.", message: generatedText };
    }
  }

  enviarPergunta(pergunta: string): Observable<string> {
    const url = `${this.urlApi}${this.geminiApiKey}`;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const body = {
      contents: [
        {
          parts: [
            {
              text: pergunta
            }
          ]
        }
      ]
    };
  
    return this.http.post<any>(url, body, { headers }).pipe(
      map((response: any) => {
        return response?.candidates[0]?.content?.parts[0]?.text || 'Não foi possível obter uma resposta.';
      })
    );
  }
  
}
