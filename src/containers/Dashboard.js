import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Text, Icon } from 'native-base';

class Dashboard extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Sprints</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigation.navigate('SelectProject')}
            >
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}

export default Dashboard;
