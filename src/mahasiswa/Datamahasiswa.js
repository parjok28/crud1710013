import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

class Datamahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMhs: [],
      refresh: false,
    };
  }

  getDataMhs = () => {
    fetch('http://192.168.43.207/api-server/public/mahasiswa')
      .then(respone => respone.json())
      .then(json => this.setState({dataMhs: json}))
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.getDataMhs();
  };
  render() {
    return (
      <View style={style.container}>
        <LinearGradient
          colors={['#1f4037', '#99f2c8']}
          style={style.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={{paddingLeft: 20}}>
            <Icon name="arrow-circle-left" size={30} color="#fff" />
          </Text>
          <Text style={style.textHeader}>Data Mahasiswa</Text>
          <Text></Text>
        </LinearGradient>

        <View style={style.isi}>
          {/* Tombol Tambah */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={style.tombolTambah}
              onPress={() => this.props.navigation.navigate('Formmahasiswa')}>
              <Text>
                <Icon name="plus-circle" size={30} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => (
                  this.getDataMhs(), this.setState({refresh: false})
                )}
              />
            }
            data={this.state.dataMhs}
            keyExtractor={item => item.mhsnobp}
            renderItem={({item, index}) => (
              <View style={style.kotak}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Bp :{item.mhsnobp}
                  </Text>
                  <Text>{item.mhsnama}</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    <Icon name="angle-double-right" size={20} color="#000" />
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

export default Datamahasiswa;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flex: 0.5,
    backgroundColor: 'red',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
  },
  tombolTambah: {
    backgroundColor: '#1f4037',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginTop: 20,
    borderRadius: 100,
    paddingVertical: 10,
  },
  textHeader: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  kotak: {
    width: 'auto',
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#99f2c8',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 20,
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  isi: {
    backgroundColor: '#fff',
    flex: 3,
  },
});
