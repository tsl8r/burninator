import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Content, Button, Header, Left, Body, Right, Title, Text, List, ListItem, Thumbnail,
} from 'native-base';
import AddPersonToSprint from '../components/AddPersonToSprint';
import asana from '../services/asana/index';
import config from '../../config';
import { setAvailableMembers } from '../state/pendingSprint/pendingSprintAction';

asana.Client.init({ token: config.ASANA_TOKEN });

class SelectProject extends Component {
  state = {
    sprintMembers: [],
    addNewUserModal: false,
  };

  componentWillMount() {
    asana.Client.getAllUsers()
      .then((availableMembers) => {
        this.props.dispatch(setAvailableMembers(availableMembers));
      });
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        addNewUserModal: !prevState.addNewUserModal,
      };
    });
  };

  saveNewSprintMember = (sprintMember) => {
    const updatedSprintMembers = this.state.sprintMembers;
    updatedSprintMembers.push(sprintMember);
    this.setState({
      sprintMembers: updatedSprintMembers,
    });
    this.toggleModal();
  };

  render() {
    const {
      addNewUserModal,
      sprintMembers,
    } = this.state;
    const {
      availableMembers,
      startDate,
      endDate,
    } = this.props;

    console.log('PROPS', this.props);

    const selectedMembers = sprintMembers.map((person) => {
      return person.id;
    });

    return (
      <Container>
        <AddPersonToSprint
          availableMembers={availableMembers}
          selectedMembers={selectedMembers}
          startDate={startDate}
          endDate={endDate}
          active={addNewUserModal}
          onCancel={this.toggleModal}
          onSave={this.saveNewSprintMember}
        />
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
              onPress={() => navigation.navigate('TeamSetup')}
            >
              <Text>
                Save
              </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {
              sprintMembers.map((member) => {
                return (
                  <ListItem
                    key={member.user.id}
                    thumbnail
                  >
                    <Left>
                      {
                        member.user.photo &&
                        <Thumbnail source={{ uri: member.user.photo.image_128x128 }} />
                      }
                    </Left>
                    <Body>
                      <Text>{member.user.name}</Text>
                      <Text note>
                        {
                          member.availableDays.reduce((sum, element) => {
                            const contributedHours = element.value * member.availableHours;
                            return sum + contributedHours;
                          }, 0)
                        } hours committed
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>Edit</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })
            }
          </List>
          <Button onPress={this.toggleModal}>
            <Text>
              + Add new user
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.pendingSprint.startDate,
  endDate: state.pendingSprint.endDate,
  availableMembers: state.pendingSprint.availableMembers,
});

export default connect(mapStateToProps)(SelectProject);
