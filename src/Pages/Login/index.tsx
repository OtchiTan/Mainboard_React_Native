import {
  View,
  StyleSheet,
  Dimensions,
  TextInput as TextInputType,
  BackHandler,
  Text,
} from 'react-native';
import {useState, useRef, useContext, useEffect} from 'react';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';
import {RoutesList} from '../../Utils/Declarations';
import {NavigationProp} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';

type LoginForm = {
  email: string;
  password: string;
};

type ResponseAPI = {
  authToken: string;
};

export default ({
  navigation,
}: {
  navigation: NavigationProp<RoutesList>;
}): JSX.Element => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const passwordInput = useRef<TextInputType>(null);
  const {setAuthToken} = useContext(AppContext);
  var {width} = Dimensions.get('window');

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    const focusListener = navigation.addListener('focus', () => {
      setLoginForm({
        email: '',
        password: '',
      });
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
      navigation.removeListener('focus', focusListener);
    };
  }, []);

  const handleSubmit = async () => {
    new AxiosClient()
      .post<ResponseAPI>('auth/login', loginForm)
      .then(({data}) => {
        setAuthToken(data.authToken);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
      });
  };

  const openRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text} onPress={openRegister}>
        Register
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="E-Mail"
          onChangeText={email =>
            setLoginForm(loginForm => {
              return {...loginForm, email};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          onSubmitEditing={passwordInput.current?.focus}
          value={loginForm.email}
        />
        <TextInput
          placeholder="Password"
          ref={passwordInput}
          onChangeText={password =>
            setLoginForm(loginForm => {
              return {...loginForm, password};
            })
          }
          style={{...styles.input, width: width / 1.5}}
          secureTextEntry={true}
          onSubmitEditing={handleSubmit}
          value={loginForm.password}
        />
        <Button
          mode="contained"
          style={{...styles.button, width: width / 2}}
          onPress={handleSubmit}>
          Login
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
