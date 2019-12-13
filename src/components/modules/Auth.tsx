/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Form } from '../ui/form/Form';
import { Input } from '../ui/form/Input';
import { Row } from '../ui/grid/Row';
import { FiShield, FiServer } from 'react-icons/fi';
import { PATHS } from '../../constants/paths';
import { Button } from '../ui/form/Button';
import { Col } from '../ui/grid/Col';
import { AuthApi } from '../../api/AuthApi';
import { FormValidatorEmail, FormValidatorMinLength } from '../ui/form/validators/FormValidator';
import { EOLocale, useTranslator } from 'eo-locale';
import { NotificationsContext, ENotificationType } from '../ui/notifications/Notifications';
import { ISocketServerError } from '@ruslanchek/magnitude-shared';
import { AppController } from '../../controllers/AppController';

export enum EMode {
  Login,
  Register,
  RememberPassword,
}

interface IModel {
  email: string;
  password: string;
}

interface IProps {
  mode: EMode;
}

const STATEFUL_TEXTS = {
  [EMode.Login]: {
    header: 'AuthScreen::LoginHeader',
    headerToggleLink1: 'AuthScreen::RegisterHeader',
    headerToggleLink2: '',
    button: 'AuthScreen::LoginButton',
  },

  [EMode.Register]: {
    header: 'AuthScreen::RegisterHeader',
    headerToggleLink1: 'AuthScreen::LoginHeader',
    headerToggleLink2: '',
    button: 'AuthScreen::RegisterButton',
  },

  [EMode.RememberPassword]: {
    header: 'AuthScreen::RememberPasswordHeader',
    headerToggleLink1: 'AuthScreen::LoginHeader',
    headerToggleLink2: 'AuthScreen::RegisterHeader',
    button: 'AuthScreen::RememberPasswordButton',
  },
};

const STATEFUL_PATHS = {
  [EMode.Login]: {
    headerToggleLink1: PATHS.AUTH_REGISTER.path,
    headerToggleLink2: undefined,
    footerToggleLink: PATHS.AUTH_REMEMBER_PASSWORD.path,
  },
  [EMode.Register]: {
    headerToggleLink1: PATHS.AUTH_LOGIN.path,
    headerToggleLink2: undefined,
  },
  [EMode.RememberPassword]: {
    headerToggleLink1: PATHS.AUTH_LOGIN.path,
    headerToggleLink2: PATHS.AUTH_REGISTER.path,
  },
};

export const Auth: React.FC<IProps> = ({ mode }) => {
  const translator = useTranslator();
  const notificationsContext = useContext(NotificationsContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const headerToggleLink1Path = STATEFUL_PATHS[mode].headerToggleLink1;
  const headerToggleLink2Path = STATEFUL_PATHS[mode].headerToggleLink2;
  const headerToggleLink1Text = STATEFUL_TEXTS[mode].headerToggleLink1;
  const headerToggleLink2Text = STATEFUL_TEXTS[mode].headerToggleLink2;

  const showApiError = (error: ISocketServerError | null) => {
    if (error?.message) {
      const text = `FormErrorsMessage::${translator.translate(error.message)}`;
      const title = `FormErrorsTitle::${translator.translate(error.message)}`;
      notificationsContext.addNotification(
        ENotificationType.Danger,
        translator.translate(text),
        translator.translate(title),
      );
    }
  };

  const handleSubmitLogin = async (model: IModel) => {
    const result = await AuthApi.login(model.email, model.password);
    showApiError(result?.error);
    return !!result?.data?.token;
  };

  const handleSubmitRegister = async (model: IModel) => {
    const result = await AuthApi.register(model.email, model.password);
    showApiError(result?.error);
    return !!result?.data?.token;
  };

  const handleSubmit = async (model: IModel) => {
    setLoading(true);
    let isAuthSuccessful = false;
    switch (mode) {
      case EMode.Login: {
        isAuthSuccessful = await handleSubmitLogin(model);
        break;
      }
      case EMode.Register: {
        isAuthSuccessful = await handleSubmitRegister(model);
        break;
      }
      case EMode.RememberPassword: {
        break;
      }
    }
    if (isAuthSuccessful) {
      await AppController.initAuth();
      history.replace(PATHS.HOME.path);
    }
    setLoading(false);
  };

  return (
    <div css={styles.root}>
      <div className='minor'>
        <div className='center'>
          <h1>
            <EOLocale.Text html id='AuthScreen::WelcomeTitle' />
          </h1>
          <p>
            <EOLocale.Text html id='AuthScreen::WelcomeText' />
          </p>
        </div>
      </div>

      <div className='major'>
        <div className='center'>
          <div className='logo' />

          <div className='form'>
            <div className='fields'>
              <div className='header'>
                <h2>
                  <EOLocale.Text id={STATEFUL_TEXTS[mode].header} />
                </h2>

                {headerToggleLink1Path && (
                  <NavLink tabIndex={1} className='light' to={headerToggleLink1Path}>
                    <EOLocale.Text id={headerToggleLink1Text} />
                  </NavLink>
                )}

                {headerToggleLink2Path && (
                  <NavLink tabIndex={1} className='light' to={headerToggleLink2Path}>
                    <EOLocale.Text id={headerToggleLink2Text} />
                  </NavLink>
                )}
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Input
                    type='email'
                    name='email'
                    tabIndex={2}
                    autoComplete='username'
                    placeholder={translator.translate('InputPlaceholder::Email')}
                    validators={[new FormValidatorEmail('ValidationError::Email')]}
                  />
                </Row>

                {mode !== EMode.RememberPassword && (
                  <Row>
                    <Input
                      tabIndex={2}
                      type='password'
                      name='password'
                      autoComplete='current-password'
                      placeholder={translator.translate('InputPlaceholder::Password')}
                      validators={[new FormValidatorMinLength('ValidationError::PasswordLength', 6)]}
                    />
                  </Row>
                )}

                <Row>
                  <Col>
                    <div>
                      <Button tabIndex={3} loading={loading} type='submit' color='default'>
                        <EOLocale.Text id={STATEFUL_TEXTS[mode].button} />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>

              <NavLink
                tabIndex={4}
                className={mode === EMode.Login ? 'light' : 'hidden'}
                to={PATHS.AUTH_REMEMBER_PASSWORD.path}>
                <EOLocale.Text id='AuthScreen::RememberPasswordLink' />
              </NavLink>
            </div>
          </div>

          <div className='features'>
            <div className='feature'>
              <FiShield className='icon' /> SSL Secured by Comodo SSL
            </div>

            <div className='feature'>
              <FiServer className='icon' /> Self-hosted service
            </div>
          </div>

          <div className='footer'>
            <EOLocale.Text
              id='Common::Copyright'
              currentYear={new Date().toLocaleDateString('en', { year: 'numeric' })}
            />
            <br />
            <EOLocale.Text id='Common::AllRightsReserved' />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-template-columns: minmax(380px, 600px) minmax(600px, 0.6fr);
    width: 100vw;
    height: 100vh;
    background-color: rgb(var(--BG));

    .hidden {
      opacity: 0;
      pointer-events: none;
    }

    .minor {
      background-color: rgb(var(--ACCENT));
      background-image: url(${require('../../assets/images/patterns/topography.svg')});
      background-position: 50% 50%;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .center {
        color: #fff;
        width: 70%;
        max-width: 400px;

        h1 {
          font-weight: 800;
          font-size: var(--FONT_SIZE_HERO_LARGE);
          line-height: 1;
          margin-bottom: 20px;
        }
      }
    }

    .major {
      background-color: rgb(var(--BG));
      background-image: url(${require('../../assets/images/patterns/topography.svg')});
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .center {
        padding: 0 15%;
        height: 70%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-content: space-around;
        flex-direction: column;

        .logo {
          width: 250px;
          height: calc(250px * var(--LOGO_PROPORTION));
          background-image: url(${require('../../assets/images/logos/logo.svg')});
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: 100%;
          flex-shrink: 0;
        }

        .header {
          display: flex;
          align-items: baseline;
          line-height: 1;

          h2 {
            line-height: 1;
          }

          a {
            margin-left: 25px;
          }
        }

        .form {
          min-width: 350px;
          flex-grow: 1;
          display: flex;
          align-items: center;

          .fields {
            min-width: 350px;
          }
        }

        .footer {
          margin-top: 25px;
          color: rgb(var(--TEXT_FADED));
        }

        .features {
          margin-top: 25px;
          color: rgb(var(--TEXT_FADED));

          .feature {
            display: flex;
            align-items: center;
            margin: 5px 0;

            .icon {
              color: rgb(var(--TEXT_FADED));
              font-size: var(--FONT_SIZE_LARGE);
              margin-right: 10px;
              transform: translateY(-1px);
            }
          }
        }
      }
    }
  `,
};
