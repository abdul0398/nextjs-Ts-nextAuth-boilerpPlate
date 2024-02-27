import RegisterForm from "./form"

function RegisterPage() {
  return (
    <div className="h-full w-full px-0 flex items-center">
      <div className="bg-[#eee] p-4 rounded-md lg:w-1/4 shadow-lg w-10/12 md:1/3 mx-auto h-fit">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage