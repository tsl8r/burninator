import React, { Component } from 'react';
import { Modal } from 'react-native';
import {
  Content, Button, Header, Left, Body, Right, Title, Text, Picker, ListItem, Radio, List, Segment,
} from 'native-base';

class AddPersonToSprint extends Component {
  state = {
    user: {},
    availableHours: 8,
    availableDays: [],
  };

  componentDidMount() {
    const dateArray = [];
    const currentDate = this.props.startDate;
    while (currentDate <= this.props.endDate) {
      const value = (currentDate.getDay() < 6 && currentDate.getDay() > 0) ? 1 : 0;
      dateArray.push({
        date: currentDate,
        value,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.setState({
      availableDays: dateArray,
    });
  }

  onCancel = () => {
    this.resetState();
    this.props.onCancel();
  };

  resetState = () => {
    this.setState({
      user: {},
      availableHours: 8,
    });
  };

  selectUser = (id) => {
    const user = this.props.availableMembers.reduce((result, element) => {
      if (element.id === id) return element;
      return result;
    }, '');

    this.setState({
      user,
    });
  };

  setAvailableHours = (availableHours) => {
    this.setState({
      availableHours,
    });
  };

  updateAvailableDays = (availability, index) => {
    this.setState((prevState) => {
      const { availableDays } = prevState;
      availableDays[index].value = availability;
      return {
        availableDays,
      };
    });
  };

  addSprintMember = () => {
    this.resetState();
    this.props.onSave(this.state);
  };

  render() {
    const {
      user,
      availableHours,
      availableDays,
    } = this.state;
    const {
      active,
      availableMembers,
      selectedMembers,
    } = this.props;

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={active}
      >
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.onCancel}
            >
              <Text>
                Cancel
              </Text>
            </Button>
          </Left>
          <Body>
            <Title>
            Edit Sprint Member
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.addSprintMember}
            >
              <Text>
                Save
              </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem itemHeader first>
              <Text>SPRINT MEMBER</Text>
            </ListItem>
            <Picker
              note
              mode="dropdown"
              placeholder="Select member of sprint"
              selectedValue={user.id}
              onValueChange={this.selectUser}
            >
              {
                availableMembers.filter(member => !(selectedMembers.includes(member.id)))
                  .map(item => (
                    <Picker.Item
                      label={item.name}
                      value={item.id}
                      key={item.id}
                    />
                  ))
              }
            </Picker>
          </List>
          <List>
            <ListItem itemHeader first>
              <Text>AVAILABLE HOURS PER DAY</Text>
            </ListItem>
            <ListItem onPress={() => this.setAvailableHours(8)}>
              <Left>
                <Text>8 hours</Text>
              </Left>
              <Right>
                <Radio selected={(availableHours === 8)} />
              </Right>
            </ListItem>
            <ListItem onPress={() => this.setAvailableHours(7)}>
              <Left>
                <Text>7 Hours</Text>
              </Left>
              <Right>
                <Radio selected={(availableHours === 7)} />
              </Right>
            </ListItem>
          </List>

          <List>
            <ListItem itemHeader first>
              <Text>DAILY AVAILABILITY</Text>
            </ListItem>
            {
              availableDays.map((element, i) => {
                const activeDate = new Date(element.date);
                const monthIndex = activeDate.getMonth();
                const month = monthList[monthIndex];
                const day = activeDate.getDate();
                return (
                  <ListItem key={i}>
                    <Left>
                      <Text>
                        {`${month} ${day}`}
                      </Text>
                    </Left>
                    <Right>
                      <Segment>
                        <Button
                          first
                          active={(element.value === 1)}
                          onPress={() => this.updateAvailableDays(1, i)}
                        >
                          <Text>Whole</Text>
                        </Button>
                        <Button
                          second
                          active={(element.value === 0.5)}
                          onPress={() => this.updateAvailableDays(0.5, i)}
                        >
                          <Text>Half</Text>
                        </Button>
                        <Button
                          last
                          active={(element.value === 0)}
                          onPress={() => this.updateAvailableDays(0, i)}
                        >
                          <Text>None</Text>
                        </Button>
                      </Segment>
                    </Right>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
      </Modal>
    );
  }
}

export default AddPersonToSprint;
