import SignInForm from '../../components/signin/SigninForm';

export default function page() {
  return (
    <div className='h-full flex-grow flex pt-[5vh] flex-col'>
      <h2 className='text-center w-full'>Se connecter</h2>
      <SignInForm />
    </div>)
}
