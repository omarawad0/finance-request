const FieldError = ({ error }: { error?: string }) => {
  return <div className="h-5 mt-1">{error && <p className="text-sm text-red-600">{error}</p>}</div>
}

export default FieldError
