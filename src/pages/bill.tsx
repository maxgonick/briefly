import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BillFullInfo from '@/components/BillFullInfo'
import EmailCallTabs from '@/components/EmailCallTabs'


type Props = {};

const Bill = (props: Props) => {
  return (
    <div>
      <Header/>
      <div className = "flex flex-row w-auto justify-evenly">
        <div className = "w-1/2 p-3">
          <BillFullInfo 
            billName = "H.R.3684 - Infrastructure Investment and Jobs Act"
            billStatus = "Pending in the House"
            billDate = "Sept 2021"
            billSponsor = "Chuck Schumer"
            billCommittee = "Senate Committee on Environment and Public Works"
            billSummary = "The bill aims to invest $1 trillion in infrastructure, including roads, bridges, public transportation, broadband, and more, with the goal of creating jobs and improving the country's infrastructure."
          />
        </div>
        <div className = "w-1/2 p-3 mr-3">
          <EmailCallTabs email = "Dear Senator Schumer, I am writing to commend you for your leadership in championing the Infrastructure Investment and Jobs Act. As a constituent who cares deeply about the state of our country's infrastructure, I believe this bill is urgently needed to create jobs, modernize our transportation systems, and invest in critical infrastructure like broadband, clean drinking water, and more. The investments outlined in this bill are sorely needed, and I am grateful that you and your colleagues in the Senate have taken action to address this pressing issue. I urge you to continue your efforts to ensure that this bill becomes law, and I will be closely following its progress in the House of Representatives. Thank you for your dedication to improving our country's infrastructure, and for your commitment to creating jobs and improving the lives of Americans. Sincerely, [Your Name]" number = "insertPhoneNo"/>
        </div>
      </div>
      <Footer/>  
    </div>
  )
}

export default Bill;