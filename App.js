import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';

//ThirdParty
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
} from 'rn-placeholder';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFetching: false,
      loading: false,
      initial: true,
    };

    this.onEndReachedCalledDuringMomentum = false;
    this.endReached = false;
    this.page = 1;
  }

  componentDidMount() {
    this._getUsers(false);
  }

  componentWillUnmount() {}

  //Flatlist
  async onRefresh() {
    this.onEndReachedCalledDuringMomentum = false;
    this.endReached = false;
    this.page = 1;
    this.setState({isFetching: true});
    await this._getUsers();
    this.setState({isFetching: false});
  }

  onScrollHandler = async () => {
    if (this.endReached) {
      return;
    }
    if (this.onEndReachedCalledDuringMomentum) {
      return;
    }
    this.onEndReachedCalledDuringMomentum = true;
    this.page = this.page + 1;
    this.setState({loading: true});
    await this._getUsers(false);
    this.setState({loading: false});
  };

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  renderHeader = () => {
    return (
      <Text style={styles.a15669ff0ce8911ea854bcb969437c385}>{'Users'}</Text>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        color="#128811"
        style={styles.a15658e80ce8911ea854bcb969437c385}
      />
    );
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.a15658e81ce8911ea854bcb969437c385}>
        <Image
          style={styles.a1565b590ce8911ea854bcb969437c385}
          source={{
            uri: item.avatarImage,
          }}
        />
        <View style={styles.a1565b591ce8911ea854bcb969437c385}>
          <Text>{item.fullname}</Text>
          <Text>{item.email}</Text>
        </View>
      </View>
    );
  };

  _getUsersApi = async () => {
    //API is too fast, adding timeout to visualize loader
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      let response = await fetch(
        `https://reqres.in/api/users?page=${this.page}`,
      );
      let json = await response.json();
      return json.data;
    } catch (error) {
      console.error(error);
    }
  };

  _getUsers = async () => {
    const data = await this._getUsersApi();

    console.log(data);
    this.updateUI(data);
  };

  updateUI = (data) => {
    let users = data.map((v) => {
      return {
        id: v.id.toString(),
        fullname: `${v.first_name} ${v.last_name}`,
        email: v.email,
        avatarImage: v.avatar,
      };
    });

    if (this.page > 1 && users.length < 1) {
      this.endReached = true;
    }

    if (this.page > 1) {
      users = [...this.state.users, ...users];
    }

    if (this.page == 0) {
      users = [...users];
    }

    this.setState({users: users, initial: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.a0f042f007b1a11ea8964c955ba1c9412}>
          <View style={styles.a15662ac0ce8911ea854bcb969437c385}>
            {this.state.initial && <LoadingPlaceholder />}

            {!this.state.initial &&
              (!this.state.users || this.state.users.length < 1) && (
                <Text>{'No user found.'}</Text>
              )}

            {!this.state.initial &&
              this.state.users &&
              this.state.users.length > 0 && (
                <FlatList
                  data={this.state.users}
                  renderItem={this.renderItem}
                  onRefresh={() => this.onRefresh(false)}
                  refreshing={this.state.isFetching}
                  onEndReached={this.onScrollHandler}
                  onEndReachedThreshold={0.7}
                  onMomentumScrollBegin={this.onMomentumScrollBegin}
                  ListFooterComponent={this.renderFooter}
                  ListHeaderComponent={this.renderHeader}
                />
              )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const LoadingPlaceholder = () => (
  <View style={styles.a15682690ce8911ea854bcb969437c385}>
    {[...Array(8)].map((v, idx) => {
      return (
        <View
          key={idx.toString()}
          style={styles.a15682691ce8911ea854bcb969437c385}>
          <Placeholder Animation={Shine} Left={PlaceholderMedia}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
          </Placeholder>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  a15658e80ce8911ea854bcb969437c385: {color: '#000'},
  a15658e81ce8911ea854bcb969437c385: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
  },
  a1565b590ce8911ea854bcb969437c385: {
    width: 80,
    height: 80,
    backgroundColor: 'lightgray',
    borderRadius: 40,
  },
  a1565b591ce8911ea854bcb969437c385: {
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  a15662ac0ce8911ea854bcb969437c385: {flex: 1},
  a15669ff0ce8911ea854bcb969437c385: {
    fontSize: 36,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  a15682690ce8911ea854bcb969437c385: {
    flex: 1,
  },
  a15682691ce8911ea854bcb969437c385: {
    marginHorizontal: 16,
    marginVertical: 22,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  a0f042f007b1a11ea8964c955ba1c9412: {flex: 1},
});
