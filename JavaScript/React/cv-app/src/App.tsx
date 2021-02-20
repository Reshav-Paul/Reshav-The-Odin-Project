import React from 'react';
import './App.css';

import SideNav from './components/SideNav';
import GenInfo from './components/GenInfo';
import GenInfoPreview from './components/GenInfoPreview';
import EducationInfo from './components/EducationInfo';
import ProfessionalInfo from './components/ProfessionalInfo';
import EducationInfoPreview from './components/EducationInfoPreview';
import ProfessionalInfoPreview from './components/ProfessionalInfoPreview';

import {globalState, sections, jobTypes, genInfoType, educationType, profType} from './types';

type propType = {};
class App extends React.Component<propType, globalState> {
  constructor(props: propType) {
    super(props);
    this.state = {
      section: sections.General,
      general: { name:'', email: '', phone:'' },
      education: [],
      profession: [],
    };
    this.handleGeneralFormSubmit = this.handleGeneralFormSubmit.bind(this);
    this.handleEducationFormSubmit = this.handleEducationFormSubmit.bind(this);
    this.handleProfessionalFormSubmit = this.handleProfessionalFormSubmit.bind(this);
  }

  switchToGeneral = () => {
    if (this.state.section === sections.General) return;
    this.setState({section: sections.General});
  }
  switchToEducation = () => {
    if (this.state.section === sections.Education) return;
    this.setState({section: sections.Education});
  }
  switchToProfessional = () => {
    if (this.state.section === sections.Professional) return;
    this.setState({section: sections.Professional});
  }

  handleGeneralFormSubmit(payload: genInfoType) {
    this.setState({general: payload});
  }

  handleEducationFormSubmit(payload: educationType) {
    this.setState({
      education: [...this.state.education, payload],
    });
  }

  handleProfessionalFormSubmit(payload: profType) {
    this.setState({
      profession: [...this.state.profession, payload],
    });
  }

  render() {
    const { section } = this.state;
    return (
      <div className="App">
        <div className="sidebar">
          <h3 className="heading">CV Builder</h3>
          <SideNav text='General' cb={this.switchToGeneral} active={section === sections.General} />
          <SideNav text='Education' cb={this.switchToEducation} active={section === sections.Education} />
          <SideNav text='Professional' cb={this.switchToProfessional} active={section === sections.Professional} />
        </div>
        {
          section === sections.General &&
          <div className="main">
            <GenInfo info={this.state.general} cb={this.handleGeneralFormSubmit} />
            <GenInfoPreview info={this.state.general} />
          </div>
        }
        {
          section === sections.Education &&
          <div className="main">
            <EducationInfo info={this.state.education} cb={this.handleEducationFormSubmit} />
            <EducationInfoPreview info={this.state.education} />
          </div>
        }
        {
          section === sections.Professional &&
          <div className="main">
            <ProfessionalInfo info={this.state.profession} cb={this.handleProfessionalFormSubmit} />
            <ProfessionalInfoPreview info={this.state.profession} />
          </div>
        }
      </div>
    );
  }
}

export default App;
