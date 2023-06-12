export type CardContainerProps = {
  children: React.ReactNode;
};

export const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-xl lg:h-full">
      {children}
    </div>
  );
};
