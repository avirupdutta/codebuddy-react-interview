import { useState } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FormStep1 = ({ control, errors }) => (
  <Form>
    <Form.Group className="mb-3">
      <Form.Label>Email *</Form.Label>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control value={value} onChange={onChange} type="email" name={name} />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Must be a valid email ID',
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Password *</Form.Label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control value={value} onChange={onChange} type="password" name={name} />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
          pattern: {
            value: /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2}).{8,}$/,
            message:
              'Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.',
          },
        }}
      />
    </Form.Group>
  </Form>
);

const FormStep2 = ({ control, errors, trigger }) => (
  <Form>
    <Form.Group className="mb-3">
      <Form.Label>First Name *</Form.Label>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control value={value} onChange={onChange} type="text" name={name} />
            {errors.firstName && <div className="text-danger">{errors.firstName.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: 'Only alphabets are allowed!',
          },
          minLength: {
            value: 2,
            message: 'Minimum 2 characters are required!',
          },
          maxLength: {
            value: 50,
            message: 'Maximum 50 characters are allowed!',
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Last Name</Form.Label>
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              onBlur={() => trigger(name)}
              value={value}
              onChange={e => {
                trigger(name);
                onChange(e);
              }}
              type="text"
              name={name}
            />
            {errors.lastName && <div className="text-danger">{errors.lastName.message}</div>}
          </>
        )}
        rules={{
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: 'Only alphabets are allowed!',
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Address *</Form.Label>
      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control value={value} onChange={onChange} type="text" name={name} />
            {errors.address && <div className="text-danger">{errors.address.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
          minLength: {
            value: 10,
            message: 'Minimum 10 characters are required!',
          },
        }}
      />
    </Form.Group>
  </Form>
);

const FormStep3 = ({ control, errors }) => (
  <Form>
    <Form.Group className="mb-3">
      <Form.Label>Country code *</Form.Label>
      <Controller
        name="countryCode"
        control={control}
        defaultValue="+91"
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Select
              name={name}
              onChange={e => onChange(e.target.value)}
              value={value}
              aria-label="Choose country code"
            >
              <option value="+91">(+91) India</option>
              <option value="+1">(+1) America</option>
            </Form.Select>
            {errors.countryCode && <div className="text-danger">{errors.countryCode.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Phone number *</Form.Label>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control value={value} onChange={onChange} type="number" name={name} />
            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber.message}</div>}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
          pattern: {
            value: /^\d{10}$/,
            message: 'Only 10 digits are allowed!',
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Controller
        name="acceptTermsAndCondition"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Check // prettier-ignore
              type="checkbox"
              name={name}
              onChange={onChange}
              value={value}
              label="I accept all terms and conditions"
            />
            {errors.acceptTermsAndCondition && (
              <div className="text-danger">{errors.acceptTermsAndCondition.message}</div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: 'This field is required!',
          },
        }}
      />
    </Form.Group>
  </Form>
);

const Home = () => {
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
    trigger,
  } = useForm();

  console.log(errors);

  const [step, setStep] = useState({
    currentStep: 1,
    totalSteps: 3,
    visited: [1],
  });
  const tabs = [
    {
      component: <FormStep1 errors={errors} control={control} />,
    },
    {
      component: (
        <FormStep2 setError={setError} trigger={trigger} errors={errors} control={control} />
      ),
    },
    {
      component: <FormStep3 errors={errors} control={control} />,
    },
  ];

  const navigate = useNavigate();
  const goToPostPage = () => navigate('/posts');

  const handleTabSelect = stepCount => {
    const currentStep = Number(stepCount);
    if (step.visited.includes(currentStep)) {
      setStep({
        ...step,
        currentStep,
      });
    }
  };

  const goBack = () => {
    // go back
    if (step.currentStep !== 1) {
      setStep({
        ...step,
        currentStep: step.currentStep - 1,
      });
    }
  };

  const handleSaveAndNext = (data, save = false) => {
    console.log({ data, save, step });

    if (save) {
      if (step.currentStep === step.totalSteps) {
        const finalData = { ...data };
        delete finalData.acceptTermsAndCondition;
        console.log('hit api with', finalData);

        fetch('https://codebuddy.review/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        })
          .then(() => {
            goToPostPage();
            toast.success('Form submitted successfully!');
          })
          .catch(() => {
            toast.error('Failed to submit the form! Please try again later.');
          });
      } else {
        toast.success('Form details have been saved!');
      }
    } else {
      setStep({
        ...step,
        currentStep: step.currentStep + 1,
        visited: [...new Set([...step.visited, step.currentStep + 1])],
      });
    }
  };

  return (
    <main>
      <Container>
        <h3>
          Step: {step.currentStep} out of {step.totalSteps}
        </h3>
        <Form>
          <Row className="mt-5">
            <Col xs={12}>
              <Tabs activeKey={step.currentStep} onSelect={handleTabSelect}>
                {tabs.map((each, index) => (
                  <Tab
                    disabled={!step.visited.includes(index + 1)}
                    eventKey={index + 1}
                    title={`Step ${index + 1}`}
                  >
                    {step.currentStep === index + 1 && <div className="pt-4">{each.component}</div>}
                  </Tab>
                ))}
              </Tabs>
            </Col>
          </Row>
          <div className="btn-group" role="group" aria-label="call to action buttons">
            <Button disabled={step.currentStep === 1} onClick={goBack}>
              Back
            </Button>
            <Button onClick={handleSubmit(data => handleSaveAndNext(data, true))}>Save</Button>
            <Button
              disabled={step.currentStep === 3}
              onClick={handleSubmit(data => handleSaveAndNext(data, false))}
            >
              Save and Next
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default Home;
