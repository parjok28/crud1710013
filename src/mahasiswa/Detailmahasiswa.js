import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
class Detailmahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomorbp: this.props.route.params.noBP,
      dataMhs: [],
      nama: '',
      alamat: '',
      telp: '',
    };
  }

  getDetail = () => {
    fetch(
      'http://192.168.42.163/api-server/public/mahasiswa/' + this.state.nomorbp,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({dataMhs: json[0]});
        this.setState({nama: this.state.dataMhs.mhsnama});
        this.setState({alamat: this.state.dataMhs.mhsalamat});
        this.setState({telp: this.state.dataMhs.mhstelp});
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getDetail();
  }

  deleteMahasiswa = () => {
    fetch(
      'http://192.168.42.163/api-server/public/mahasiswa/' + this.state.nomorbp,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.props.navigation.push('Datamahasiswa');
      })
      .catch(err => console.log(err));
  };

  updateMahasiswa = () => {
    fetch(
      'http://192.168.42.163/api-server/public/mahasiswa/' + this.state.nomorbp,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mhsnama: this.state.nama,
          mhsalamat: this.state.alamat,
          mhstelp: this.state.telp,
        }),
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        ToastAndroid.show(
          `Data dengan Nomor BP ${this.state.nomorbp} berhasil diupdate`,
          ToastAndroid.SHORT,
        );
        this.props.navigation.push('Datamahasiswa');
      })
      .catch(err => console.log(err));
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

          <Text style={style.textHeader}>Detail Mahasiswa</Text>
          <Text></Text>
        </LinearGradient>

        <View style={style.isi}>
          <View style={style.viewTextInput}>
            <TextInput
              value={this.state.nomorbp}
              style={style.TextInput}
              editable={false}
            />
            <TextInput
              value={this.state.nama}
              style={style.TextInput}
              onChangeText={value => this.setState({nama: value})}
            />
            <TextInput
              value={this.state.alamat}
              style={style.TextInput}
              onChangeText={value => this.setState({alamat: value})}
            />
            <TextInput
              value={this.state.telp}
              style={style.TextInput}
              onChangeText={value => this.setState({telp: value})}
            />
          </View>
          <View style={style.viewTombol}>
            <TouchableOpacity
              style={style.tombolEdit}
              onPress={() => this.updateMahasiswa()}>
              <Text>
                <Icon name="edit" size={50} color="#fff" />
              </Text>
              <Text style={style.tombolText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.tombolHapus}
              onPress={() =>
                Alert.alert('Warning', 'Yakin dihapus data ini?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => null,
                  },
                  {
                    text: 'Ya,Hapus',
                    onPress: () => this.deleteMahasiswa(),
                  },
                ])
              }>
              <Text>
                <Icon name="trash-alt" size={50} color="#fff" />
              </Text>
              <Text style={style.tombolText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Detailmahasiswa;

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
    borderBottomColor: '#99f2c8',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    marginTop: 20,
    color: 'black',
  },
  viewTombol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tombolEdit: {
    backgroundColor: '#43a047',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  tombolHapus: {
    backgroundColor: '#d50000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  tombolText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingLeft: 5,
  },
});
