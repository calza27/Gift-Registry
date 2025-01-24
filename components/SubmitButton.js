
import Button from './Button';

export default function SubmitButton({ isSubmitting = false }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      style={{
        marginTop: "10px"
      }}>
      {isSubmitting ? 'Saving...' : 'Save'}
    </Button>
  )
}