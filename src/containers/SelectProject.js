import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Content, DatePicker, Header, Left, Body, Right, Button, Title, Text, Icon, Picker,
} from 'native-base';
import asana from '../services/asana/index';
import config from '../../config';
import { setStartDate, setEndDate } from '../state/pendingSprint/pendingSprintAction';

asana.Client.init({ token: config.ASANA_TOKEN });

class SelectProject extends Component {
  state = {
    projectId: '',
    projects: [],
  };

  async componentDidMount() {
    const results = await asana.Client.getProjects();
    // Filter out projects that don't contain the name sprint or contain TEMPLATE
    const projects = results.filter(item => item.name.includes('Sprint') && !item.name.includes('TEMPLATE'));
    this.setState({
      projects,
    });
  }

  onSubmit = () => {
    this.props.navigation.navigate('TeamSetup');
  };

  setChosenProject = (projectId) => {
    this.setState({ selectedProjectId: parseInt(projectId, 10) });
  };

  setStartDate = (startDate) => {
    this.props.dispatch(setStartDate(startDate));
  };

  setEndDate = (endDate) => {
    this.props.dispatch(setEndDate(endDate));
  };

  render() {
    const {
      projects,
      selectedProjectId,
      startDate,
    } = this.state;

    const projectOptions = projects.map(project => (
      <Picker.Item
        key={project.id}
        label={project.name}
        value={project.id}
      />
    ));

    const date = new Date();
    const today = new Date(2018, date.getMonth + 1, date.getDate());

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>
              Sprint Setup
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.onSubmit}
            >
              <Text>
                Next
              </Text>
              <Icon name="arrow-forward" />
            </Button>
          </Right>
        </Header>
        <Content>
          {projectOptions &&
            <Picker
              note
              placeholder='Select a project'
              mode='dropdown'
              selectedValue={selectedProjectId}
              onValueChange={this.setChosenProject}
            >
              {projectOptions}
            </Picker>
          }

          <DatePicker
            value={startDate}
            defaultDate={today}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2020, 1, 1)}
            locale="en"
            modalTransparent={false}
            animationType="fade"
            androidMode="default"
            placeHolderText="Select start date"
            onDateChange={this.setStartDate}
          />

          <DatePicker
            value={startDate}
            defaultDate={startDate || today}
            minimumDate={startDate || new Date(2018, 1, 1)}
            maximumDate={new Date(2020, 1, 1)}
            locale="en"
            modalTransparent={false}
            animationType="fade"
            androidMode="default"
            placeHolderText="Select end date"
            onDateChange={this.setEndDate}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.pendingSprint.startDate,
  endDate: state.pendingSprint.endDate,
});

export default connect(mapStateToProps)(SelectProject);
