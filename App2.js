import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMhs: [],
      nobp: '',
      nama: '',
      alamat: '',
      telp: '',
    };
  }

  getDataMhs = () => {
    fetch('http://192.168.42.163/api-server/public/mahasiswa')
      .then(respone => respone.json())
      .then(json => this.setState({dataMhs: json}))
      .catch(err => console.log(err));
  };

  saveDataMhs = () => {
    fetch('http://192.168.42.163/api-server/public/mahasiswa', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mhsnobp: this.state.nobp,
        mhsnama: this.state.nama,
        mhsalamat: this.state.alamat,
        mhstelp: this.state.telp,
      }),
    })
      .then(respone => respone.json())
      .then(json => {
        json.status == 201
          ? Alert.alert('Sukses', 'data mahasiswa berhasil disimpan')
          : '';
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.getDataMhs();
        this.setState({nobp: ''});
        this.setState({nama: ''});
        this.setState({alamat: ''});
        this.setState({telp: ''});
      });
  };

  componentDidMount = () => {
    this.getDataMhs();
  };
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={this.state.dataMhs}
          keyExtractor={item => item.mhsnobp}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
              }}>
              <Text>{++index}</Text>
              <Text>{item.mhsnobp}</Text>
              <Text>{item.mhsnama}</Text>
            </View>
          )}
        />

        <TextInput
          style={style.input}
          value={this.state.nobp}
          onChangeText={value => this.setState({nobp: value})}
          placeholder="Input Nobp"
        />
        <TextInput
          style={style.input}
          value={this.state.nama}
          onChangeText={value => this.setState({nama: value})}
          placeholder="Input Nama Lengkap"
        />
        <TextInput
          style={style.input}
          value={this.state.alamat}
          onChangeText={value => this.setState({alamat: value})}
          placeholder="Input Alamat"
        />
        <TextInput
          style={style.input}
          value={this.state.telp}
          onChangeText={value => this.setState({telp: value})}
          placeholder="Input No.telp"
        />
        <TouchableOpacity
          style={style.button}
          onPress={() => this.saveDataMhs()}>
          <Text>Simpan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;

const style = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    width: 200,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});
