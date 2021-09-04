import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

class Formmahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nobp: '',
      nama: '',
      alamat: '',
      telp: '',
    };
  }
  saveDataMhs = () => {
    fetch('http://192.168.43.207/api-server/public/mahasiswa', {
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
        this.setState({nobp: ''});
        this.setState({nama: ''});
        this.setState({alamat: ''});
        this.setState({telp: ''});
      });
  };
  render() {
    return (
      <View style={style.container}>
        <LinearGradient
          colors={['#1f4037', '#99f2c8']}
          style={style.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{paddingLeft: 20}}>
              <Icon name="arrow-circle-left" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>

          <Text style={style.textHeader}>Form Mahasiswa</Text>
          <Text></Text>
        </LinearGradient>

        <View style={style.isi}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <TextInput
              value={this.state.nobp}
              onChangeText={value => this.setState({nobp: value})}
              placeholder="Inputkan No Bp"
              placeholderTextColor="#1f4037"
              style={style.TextInput}
              keyboardType="number-pad"
            />
            <TextInput
              value={this.state.nama}
              onChangeText={value => this.setState({nama: value})}
              placeholder="Inputkan Nama"
              placeholderTextColor="#1f4037"
              style={style.TextInput}
            />
            <TextInput
              value={this.state.alamat}
              onChangeText={value => this.setState({alamat: value})}
              placeholder="Inputkan Alamat"
              placeholderTextColor="#1f4037"
              style={style.TextInput}
            />
            <TextInput
              value={this.state.telp}
              onChangeText={value => this.setState({telp: value})}
              placeholder="Inputkan No Telp"
              placeholderTextColor="#1f4037"
              style={style.TextInput}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={style.tombolSimpan}
              onPress={() => this.saveDataMhs()}>
              <Text>
                <Icon name="save" size={30} color="#fff" />
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 10,
                }}>
                Simpan Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Formmahasiswa;

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
  textHeader: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  isi: {
    backgroundColor: '#fff',
    flex: 3,
  },
  TextInput: {
    borderWidth: 2,
    borderColor: '#99f2c8',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    color: 'black',
    marginVertical: 10,
  },
  tombolSimpan: {
    backgroundColor: '#1f4037',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
