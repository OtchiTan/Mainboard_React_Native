import {View, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';
import {NavigationProp} from '@react-navigation/native';
import {RoutesList} from '../../Utils/Declarations';
import {TextInput, Button, Text} from 'react-native-paper';

type RegisterForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type ResponseAPI = {
  authToken: string;
};

export default ({
  navigation,
}: {
  navigation: NavigationProp<RoutesList>;
}): JSX.Element => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {setAuthToken} = useContext(AppContext);
  var {width} = Dimensions.get('window');

  useEffect(() => {
    const backHandler = () => {
      navigation.navigate('Login');
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    const focusListener = navigation.addListener('focus', () => {
      setRegisterForm({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
      navigation.removeListener('focus', focusListener);
    };
  }, []);

  const handleSubmit = async () => {
    new AxiosClient()
      .post<ResponseAPI>('auth/register', registerForm)
      .then(({data}) => {
        setAuthToken(data.authToken);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text} onPress={openLogin}>
        Login
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="E-Mail"
          onChangeText={email =>
            setRegisterForm(loginForm => {
              return {...loginForm, email};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          value={registerForm.email}
        />
        <TextInput
          placeholder="Username"
          onChangeText={username =>
            setRegisterForm(loginForm => {
              return {...loginForm, username};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          value={registerForm.username}
        />
        <TextInput
          placeholder="Password"
          onChangeText={password =>
            setRegisterForm(loginForm => {
              return {...loginForm, password};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          secureTextEntry={true}
          onSubmitEditing={handleSubmit}
          value={registerForm.password}
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={confirmPassword =>
            setRegisterForm(loginForm => {
              return {...loginForm, confirmPassword};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          secureTextEntry={true}
          onSubmitEditing={handleSubmit}
          value={registerForm.confirmPassword}
        />
        <Button
          mode="contained"
          style={{...styles.button, width: width / 2}}
          onPress={handleSubmit}>
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 50,
  },
  text: {
    padding: 15,
    color: 'white',
    textDecorationLine: 'none',
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 20,
  },
  input: {
    marginVertical: 20,
  },
});
