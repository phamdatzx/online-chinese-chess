import ChineseChessGame from "../components/ChineseChessGame";

export default function GamePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <ChineseChessGame />
        </div>
      </main>
    </div>
  );
}
