import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    }else if (errorResponse instanceof Response
       && errorResponse.status >= 400 && errorResponse.status <= 499) {
        let errors;
        msg = 'Ocorreu um erro ao processar a sua solicitacao';

        try {
          errors = errorResponse.json();

          msg = errors[0].mensagemUsuario;
        } catch (e) { }
        console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar o servico, tente novamente';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.toastyService.error(msg);
  }

}
