interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      {children}
    </div>
  );
}
