import { useState } from 'react';
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
            {errors.email && <div className="text-danger">Must be a valid email ID</div>}
          </>
        )}
        rules={{
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
            {errors.password && (
              <div className="text-danger">
                Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special
                characters.
              </div>
            )}
          </>
        )}
        rules={{
          required: true,
          pattern: /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2}).{8,}$/,
        }}
      />
    </Form.Group>
  </Form>
);

const FormStep2 = ({ control, errors }) => (
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
            {errors.firstName && (
              <div className="text-danger">
                Only alphabets are allowed. Minimum of 2 character and maximum 50.
              </div>
            )}
          </>
        )}
        rules={{
          required: true,
          pattern: /^[a-zA-Z]{2,50}$/,
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
            <Form.Control value={value} onChange={onChange} type="text" name={name} />
            {errors.lastName && (
              <div className="text-danger">
                Only alphabets are allowed. Minimum of 2 character and maximum 50.
              </div>
            )}
          </>
        )}
        rules={{
          required: false,
          pattern: /^[a-zA-Z]+$/,
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
            {errors.address && <div className="text-danger">Minimum length 10.</div>}
          </>
        )}
        rules={{
          required: true,
          pattern: /^[a-zA-Z]{10,}$/,
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
        defaultValue="+91 "
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
            {errors.countryCode && <div className="text-danger">This field is required!</div>}
          </>
        )}
        rules={{
          required: true,
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
            {errors.phoneNumber && (
              <div className="text-danger">Only 10 digit numeric phone number is allowed.</div>
            )}
          </>
        )}
        rules={{
          required: true,
          pattern: /^\d{10}$/,
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
              <div className="text-danger">This field is required!</div>
            )}
          </>
        )}
        rules={{
          required: true,
        }}
      />
    </Form.Group>
  </Form>
);

const Home = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log({ errors });

  const [step, setStep] = useState({
    currentStep: 1,
    totalSteps: 3,
  });
  const navigate = useNavigate();
  const goToPostPage = () => navigate('/posts');

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
      }
    } else {
      setStep({
        ...step,
        currentStep: step.currentStep + 1,
      });
    }
  };

  const RenderFormByStep = () => {
    switch (step.currentStep) {
      case 1:
        return <FormStep1 errors={errors} control={control} />;

      case 2:
        return <FormStep2 errors={errors} control={control} />;

      case 3:
        return <FormStep3 errors={errors} control={control} />;

      default:
        return null;
    }
  };

  return (
    <main>
      <Container>
        <h3>
          Step: {step.currentStep} out of {step.totalSteps}
        </h3>
        <Form>
          {RenderFormByStep()}
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
