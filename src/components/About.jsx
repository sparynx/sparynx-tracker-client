import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 md:px-12 text-gray-800">
      <h1 className="text-3xl font-semibold mb-4">About This Budget App</h1>
      <p className="text-lg leading-relaxed mb-6">
        Managing money can be stressful, but it doesn’t have to be. This budget app was created to make budgeting simple, clear, and stress-free—helping you stay in control of your finances without feeling overwhelmed.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Why We Built This App</h2>
      <p className="text-lg leading-relaxed mb-6">
        Let’s be real—keeping track of expenses, savings, and financial goals can feel like a never-ending task. We’ve all been there, wondering where our money went at the end of the month. That’s why this app was built: to give you a clear picture of your finances, help you spend smarter, and save with confidence.
      </p>

      <h2 className="text-2xl font-semibold mb-3">What You Can Do Here</h2>
      <ul className="list-disc list-inside space-y-2 text-lg mb-6">
        <li><strong>Create and track budgets effortlessly</strong> – No complicated setups, just a simple way to stay on top of your money.</li>
        <li><strong>See your spending in real time</strong> – Get visual breakdowns of where your money goes.</li>
        <li><strong>Stay on top of financial goals</strong> – Whether it’s saving for something big or just cutting unnecessary expenses, we’ve got you covered.</li>
        <li><strong>Track progress over time</strong> – A built-in timeline lets you see how far you’ve come.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
      <p className="text-lg leading-relaxed mb-6">
        We believe everyone deserves financial peace of mind. Money should be a tool that works for you, not something that controls you. Our goal is to help you make smarter financial choices while keeping things simple and easy to manage.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Start Budgeting Smarter</h2>
      <p className="text-lg leading-relaxed">
        If you’re ready to take charge of your finances—without overcomplicating things—this app is for you. Start today, and let’s make budgeting a habit, not a headache.
      </p>
    </div>
  );
};

export default About;
