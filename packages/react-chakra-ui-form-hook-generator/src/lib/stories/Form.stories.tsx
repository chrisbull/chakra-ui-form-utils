import { Container } from '@chakra-ui/layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { Form, FormProps } from '../components/Form';
import { formValidation, FormValidation, schema } from '../example/schema';

const meta: Meta<FormProps<FormValidation>> = {
  title: 'Form',
  component: Form,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    showFormDebugger: true,
    title: 'Form Generator',
    handleSubmit: action('Submit'),
    schema: schema,
    formOptions: {
      resolver: zodResolver(formValidation),
    },
  },
};

const Template: Story<FormProps<FormValidation>> = (args) => {
  return (
    <Container>
      <Form {...args} />
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
