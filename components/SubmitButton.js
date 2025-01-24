
import { CUR } from 'aws-sdk';
import Button from './Button';

export default function SubmitButton({ disabled = false, isSubmitting = false }) {
  const opacity = () => {
    if (disabled) {
      return "0.5";
    } else {
      return "1";
    }
  }

  const pointer = () => {
    if (disabled) {
      return "not-allowed";
    } else {
      return "pointer";
    }
  }



  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      style={{
        marginTop: "10px",
        opacity: opacity(),
        cursor: pointer(),
      }}>
      {isSubmitting ? 'Saving...' : 'Save'}
    </Button>
  )
}