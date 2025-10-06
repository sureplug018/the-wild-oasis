import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isUpdating, updateSettings } = useUpdateSettings();

  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
