/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

function FormikForm({
  children, className, initialValues, validationSchema, submit,
}) {
  return (
    <div className={className}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {() => (
          <Form className="flex justify-center flex-col w-full">
            {children}
          </Form>
        )}
      </Formik>
    </div>
  );
}

FormikForm.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
};

export default FormikForm;
