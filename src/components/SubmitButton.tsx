import { Button, Form, FormInstance } from "antd";
import React, { useEffect, FC } from "react";

interface Props {
  form: FormInstance;
}

export const SubmitButton: FC<Props> = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button size="large" type="primary" disabled={!submittable}>
      Save
    </Button>
  );
};
