/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { Form } from '../ui/form/Form';
import { Input } from '../ui/form/Input';
import { Button } from '../ui/form/Button';
// import { NotificationsContext } from '../ui/notifications/Notifications';

interface IProps {
  closeHandler: () => void;
}

interface IModel {
  title: string;
}

export const NewProjectModal: React.FC<IProps> = ({ closeHandler }) => {
  // const notificationContext = useContext(NotificationsContext);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<IModel>({
    title: '',
  });

  const handleSubmit = async (model: IModel) => {
    setLoading(true);
    // const result = await ProjectApi.create(model.title);

    // if (result.error?.message) {
    //   notificationContext.addNotification(ENotificationType.Danger, result.error.message, result.error.message);
    // } else {
    //   setModel({
    //     title: '',
    //   });
    // }

    setLoading(false);
  };

  return (
    <div css={styles.root}>
      <button onClick={closeHandler}>Close</button>
      <h2>New Project</h2>

      <Form<IModel> onSubmit={handleSubmit} onChange={setModel}>
        <Input name='title' value={model.title} />
        <Button loading={loading} type='submit'>
          Create project
        </Button>
      </Form>
    </div>
  );
};

const styles = {
  root: css`
    padding: 40px;
    background-color: rgb(var(--WHITE));
    border-radius: var(--BORDER_RADIUS_LARGE);
    box-shadow: var(--ELEVATION_SHADOW_3);
  `,
};
