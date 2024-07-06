const FollowBlock: React.FC<{ amount: number; text: string }> = ({
  amount,
  text,
}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='font-bold'>{amount}</p>
      <p>{text}</p>
    </div>
  );
};

export default FollowBlock;
