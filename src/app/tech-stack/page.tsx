
const TechStackPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recommended Tech Stack</h1>
      <p className="mb-6">Building a trading bot requires a combination of programming languages, libraries, and platforms. Here is a typical tech stack for such a project.</p>
      <div className="space-y-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Core Language: Python</h2>
          <p>Python is the de facto standard for data science and machine learning due to its extensive libraries and ease of use. Its readability and strong community support make it ideal for this kind of project.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Data Manipulation: Pandas & NumPy</h2>
          <p>Pandas is essential for handling and analyzing time-series data. NumPy provides powerful tools for numerical computation. Together, they form the backbone of any data analysis workflow in Python.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">AI/ML Frameworks: TensorFlow or PyTorch</h2>
          <p>These are the two leading deep learning frameworks. You would use them to design, train, and evaluate your neural network models (like LSTMs). Both have extensive documentation and pre-built modules to accelerate development.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Broker API Integration</h2>
          <p>To execute trades (even paper trades), you need to connect to a brokerage that offers an API. Popular choices for developers include Alpaca, Interactive Brokers, or Tradier. These APIs allow you to programmatically fetch data, place orders, and manage your portfolio.</p>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
