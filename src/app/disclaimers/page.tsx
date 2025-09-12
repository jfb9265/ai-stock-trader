
const DisclaimersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Critical Disclaimers</h1>
      <div className="space-y-4">
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <h2 className="font-bold">High Financial Risk</h2>
          <p>Algorithmic trading is extremely risky and can lead to substantial financial loss. The strategies and concepts discussed on this website are for educational purposes only and should not be considered financial advice.</p>
        </div>
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <h2 className="font-bold">Not Financial Advice</h2>
          <p>This website does not provide investment advice, and you should not construe any of the content as such. Always consult with a qualified financial professional before making any investment decisions.</p>
        </div>
        <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
          <h2 className="font-bold">For Educational Purposes Only</h2>
          <p>The content on this website is purely for learning and exploration in the fields of AI and software development. Building a real-world trading bot requires deep expertise in finance, regulation, and risk management.</p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimersPage;
