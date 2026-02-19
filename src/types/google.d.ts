/**
 * Type definitions for Google Identity Services
 * https://developers.google.com/identity/gsi/web
 */

declare namespace google {
  namespace accounts {
    namespace id {
      /**
       * Configuração para inicializar o Google Sign-In
       */
      interface IdConfiguration {
        /** OAuth 2.0 client ID */
        client_id: string;
        
        /** Callback chamado quando o usuário faz login */
        callback: (response: CallbackResponse) => void;
        
        /** Habilita seleção automática de conta */
        auto_select?: boolean;
        
        /** Cancela o prompt automático */
        cancel_on_tap_outside?: boolean;
        
        /** Context do prompt */
        context?: 'signin' | 'signup' | 'use';
      }

      /**
       * Resposta do callback de autenticação
       */
      interface CallbackResponse {
        /** JWT credential token */
        credential: string;
        
        /** Método de seleção usado */
        select_by: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm';
      }

      /**
       * Configuração do botão de login
       */
      interface ButtonConfiguration {
        /** Tema do botão */
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        
        /** Tamanho do botão */
        size?: 'large' | 'medium' | 'small';
        
        /** Texto do botão */
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        
        /** Formato do botão */
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        
        /** Largura do botão em pixels */
        width?: number;
        
        /** Logo alignment */
        logo_alignment?: 'left' | 'center';
      }

      /**
       * Payload decodificado do JWT
       */
      interface TokenPayload {
        /** Email do usuário */
        email: string;
        
        /** Email verificado */
        email_verified: boolean;
        
        /** Nome completo */
        name: string;
        
        /** URL da foto de perfil */
        picture: string;
        
        /** Nome */
        given_name: string;
        
        /** Sobrenome */
        family_name: string;
        
        /** ID único do usuário */
        sub: string;
        
        /** Issued at */
        iat: number;
        
        /** Expiration time */
        exp: number;
      }

      /**
       * Inicializa o Google Identity Services
       */
      function initialize(config: IdConfiguration): void;

      /**
       * Renderiza o botão de sign-in
       */
      function renderButton(
        parent: HTMLElement | null,
        options: ButtonConfiguration
      ): void;

      /**
       * Desabilita a seleção automática de conta
       */
      function disableAutoSelect(): void;

      /**
       * Exibe o One Tap prompt
       */
      function prompt(momentListener?: (notification: PromptMomentNotification) => void): void;

      /**
       * Cancela o One Tap prompt
       */
      function cancel(): void;

      /**
       * Notificação de momento do prompt
       */
      interface PromptMomentNotification {
        isDisplayMoment(): boolean;
        isDisplayed(): boolean;
        isNotDisplayed(): boolean;
        getNotDisplayedReason(): string;
        isSkippedMoment(): boolean;
        getSkippedReason(): string;
        isDismissedMoment(): boolean;
        getDismissedReason(): string;
        getMomentType(): string;
      }
    }
  }
}