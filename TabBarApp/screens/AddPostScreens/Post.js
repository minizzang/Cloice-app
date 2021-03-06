import React from 'react';
import { Text,StyleSheet, FlatList, Image, View, Dimensions, TouchableOpacity, BackHandler} from 'react-native';
import { ScrollView, TapGestureHandler } from 'react-native-gesture-handler';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialLayout = { width: Dimensions.get('window').width };
var { height, width } = Dimensions.get('screen');

const Post = ({navigation, route}) => {
  const backAction = () => {
    navigation.popToTop();
  }

  const { inputText, ImageURI, selImgDataArr, captureImageURI } = route.params
  
  const [nickname, setNickname] = React.useState('');

  React.useEffect(() => {
    const temp = async () => {
      await AsyncStorage.getItem('userToken', async (err, result) => {
        setEmail(result);
      });

      await AsyncStorage.getItem('nickname', async (err, result) => {
        setNickname(result);
      });
    }
    temp();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [])

  const renderSwipper = () => {
    if(ImageURI != undefined) {
      return(
        <SwiperFlatList showPagination paginationActiveColor = "#99D1E9" paginationDefaultColor = "#dfdfdf">
          <View style={[styles.child]}>
            <Image style={{height:'100%', width:'100%', resizeMode: 'contain'}} source={{uri: captureImageURI}}/>
          </View>
          <View style={[styles.child]}>
            <Image style={{height:'100%', width:'100%', resizeMode: 'contain'}} source={{uri: ImageURI}}/>
          </View>
        </SwiperFlatList>
      );
    } else {
      return (
        <SwiperFlatList showPagination paginationActiveColor = "#99D1E9" paginationDefaultColor = "#dfdfdf">
          <View style={[styles.child]}>
            <Image style={{height:'100%', width:'100%', resizeMode: 'contain'}} source={{uri: captureImageURI}}/>
          </View>
        </SwiperFlatList>
      );
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems: 'center', marginVertical: 10,}}>
        <TouchableOpacity onPress={()=>{ navigation.navigate("MyProfile")}}>
        <Image source={require('../../login/profileImage/ProfileImage.jpg')} 
        style={{width:52,height:52, borderRadius:26, marginRight:10, borderColor:'#dfdfdf', borderWidth: 1}}/>
        </TouchableOpacity>
        <Text style={styles.text1}>{nickname}?????? ??????</Text>
        <TouchableOpacity style={{
            position: 'absolute',
            right: 10,
            width: 30,
            height: 30,
            }}
            onPress={() => {navigation.popToTop()}}>
          <Feather
            name="x"
            color="black"
            size={25}
          />
        </TouchableOpacity>
        
      </View>
      <View style={styles.box}>
        {renderSwipper()}
      </View>
      <ScrollView horizontal={true} style={{width: '100%'}}>
        
        {selImgDataArr.map((selImgDataArr, index) => {
          return(
          <View style={styles.minibox}>
            <Image source={selImgDataArr.src} key={index} style={{width: '100%', height: '100%'}}/>
          </View>
          )
        })}
      </ScrollView>
      <View style= {styles.likebox}>
        <AntDesign 
          name="heart"
          color="red"
          size={18}
        />
      </View>
      <View style = {{marginVertical: 5}}>
        <Text style ={styles.maintext}>{inputText}</Text>
      </View>
    </View>
  );    
}

export default Post

  


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#Fcfcfc',
    // height: '100%'
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width:'100%', 
    height: width-32,
    backgroundColor: '#fff',
    justifyContent:'center', 
    alignItems:'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  minibox: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likebox: {
    marginVertical: 10,
    width: '100%',
    // backgroundColor: 'yellow'
  },
  subtitle: {
    fontFamily: 'NanumSquareR',
    fontSize: 14,
    color:'#707070'
  },
  maintext: {
    fontFamily: 'NanumSquareR',
    fontSize: 12,
  },
  text1: {
    fontFamily: 'NanumSquareR',
    fontSize: 14,
  },
  child: { width:width-32, justifyContent: 'center' },
})
