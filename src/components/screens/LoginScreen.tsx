/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ScreenWrapper } from '../ScreenWrapper';
import { Form } from '../ui/form/Form';
import { Input } from '../ui/form/Input';
import { Row } from '../ui/grid/Row';
import { FiShield, FiServer } from 'react-icons/fi';
import { PATHS } from '../../constants/paths';
import { Button } from '../ui/form/Button';
import { Col } from '../ui/grid/Col';
import { AuthApi } from '../../api/AuthApi';
import { AppController } from '../../controllers/AppController';
import { FormValidatorEmail, FormValidatorMinLength } from '../ui/form/validators/FormValidator';
import { useOnlyUnauthorizedRoute } from '../../hooks/useOnlyAuthorizedRoute';
import { EOLocale } from 'eo-locale';
import { appTranslator } from '../../App';

interface IModel {
  email: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = useCallback(async (model: IModel) => {
    setLoading(true);
    const result = await AuthApi.login(model.email, model.password);
    if (result && result.token) {
      await AppController.initAuth();
      history.replace(PATHS.HOME);
    }
    setLoading(false);
  }, []);
  useOnlyUnauthorizedRoute(PATHS.HOME);

  return (
    <ScreenWrapper raw>
      <div css={styles.root}>
        <div className='minor'>
          <div className='center'>
            <h1>Project Evolution Management On&nbsp;Steroids</h1>
            <p>Magnitude helps professionals discover, organize and track projects, so nothing falls off the radar.</p>
          </div>
        </div>
        <div className='major'>
          <div className='center'>
            <div className='logo' />

            <div className='form'>
              <div className='fields'>
                <div className='header'>
                  <h2>
                    <EOLocale.Text id='AuthScreen::LoginHeader' />
                  </h2>
                  <a className='light' href={PATHS.AUTH_REGISTER}>
                    <EOLocale.Text id='AuthScreen::SignUpHeader' />
                  </a>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Input
                      type='email'
                      name='email'
                      autoComplete='username'
                      placeholder={appTranslator.translate('InputPlaceholder::Email')}
                      validators={[new FormValidatorEmail('ValidationError::Email')]}
                    />
                  </Row>

                  <Row>
                    <Input
                      type='password'
                      name='password'
                      autoComplete='current-password'
                      placeholder={appTranslator.translate('InputPlaceholder::Password')}
                      validators={[new FormValidatorMinLength('ValidationError::PasswordLength', 6)]}
                    />
                  </Row>

                  <Row>
                    <Col>
                      <Button loading={loading} type='submit' color='default'>
                        <EOLocale.Text id='AuthScreen::LoginButton' />
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <a className='light underline' href={PATHS.AUTH_LOGIN}>
                  <EOLocale.Text id='AuthScreen::RememberPasswordLink' />
                </a>
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
    </ScreenWrapper>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-template-columns: minmax(380px, 600px) minmax(600px, 0.6fr);
    width: 100vw;
    height: 100vh;
    background-color: rgb(var(--BG));

    .minor {
      background-color: #364fcc;
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
            margin-right: 30px;
            line-height: 1;
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
