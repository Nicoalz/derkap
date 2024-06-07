import SignUpForm from '../../components/signup/SignupForm';

export default function page() {
  return (
    <div className='h-full flex-grow flex pt-[5vh] flex-col'>
      <h2 className='text-center w-full'>Créer un compte</h2>
      <SignUpForm />
    </div>
  )
}
