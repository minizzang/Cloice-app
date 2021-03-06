import React from 'react';
import { View, Text, TouchableOpacity , Image, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import { BASE_URL } from '../components'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };
var { height, width } = Dimensions.get('screen');

export default function MyProfile({ navigation }) {
  const [myProfileStoryData, setMyProfileStoryData] = React.useState([]);
  const [codiFeedData, setCodiFeedData] = React.useState([]);
  const [nickname, setNickname] = React.useState("");
  var email = '';
  
  const renderItemStory = ({ item }) => {
    return(
      <View>
          <TouchableOpacity onPress={() => {
            if(item.id == 'firstItem') {
              navigation.navigate("Closet");
            }
          }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Image source={{uri: item.file}} style={[styles.storyimage]} />
              </View>
          </TouchableOpacity>   
      </View>
    );
  }

  const FirstRoute = () => {
    const renderItem = ({ item,index }) => {
      return(
        <View>
          <TouchableOpacity onPress = {() => {navigation.navigate("MyProfileFeedDetail", {
            item: item
          })}}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={{uri: item.ImageURI}} style={[{ width: (width-32) / 3 }, { height: (width-32) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { marginLeft: 2 } : { marginLeft: 0 } ]} />
          </View>
          </TouchableOpacity>   
        </View>
      );
    };

    return(
    <FlatList style={{flexDirection : "column"}}
        data={codiFeedData} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3} />
    );
  }
    
  const SecondRoute = () => {
    const renderItem = ({ item,index }) => {
      return(
        <View>
          <TouchableOpacity onPress = {() => {navigation.navigate("MyProfileFeedDetail", {
            item: item
          })}}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={{uri: item.ImageURI}} style={[{ width: (width-32) / 3 }, { height: (width-32) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { marginLeft: 2 } : { marginLeft: 0 } ]} />
          </View>
          </TouchableOpacity>   
        </View>
      );
    };
  
    return(
      <FlatList style={{flexDirection : "column"}}
        data={codiFeedData}
        renderItem={renderItem} 
        keyExtractor={item => item.id} 
        numColumns={3} />    
    );
  }

  React.useEffect(() => {
      const temp = async () => {
        await AsyncStorage.getItem('userToken', (err, result) => {  
          email = result;
        });

        await AsyncStorage.getItem('nickname', (err, result) => {
          setNickname(result);
        });

        await Axios.post(BASE_URL + "/getCloset", {
          email: email,
        }).then((response) => {
          var arr = response.data;
          const firstItem = { 
            id: 'firstItem',
            file: 'http://192.249.18.100:80/images/closetButton.png', 
          };
          arr.reverse();
          arr.splice(0, 0, firstItem);
          setMyProfileStoryData(arr.slice(0, 10));
        }).catch((error) => {
          console.log("??????:", error);
          throw error;
        });

        await Axios.post(BASE_URL +'/getFeedProfile', {
          email: email,
        }).then((response) => {
          setCodiFeedData(response.data);
        }).catch((error) => {
          console.log("??????:", error);
          throw error;
        });
      }
      temp();
    }, [navigation])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '??????'},
    { key: 'second', title: '?????????' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
      <ScrollView horizontal={true} >
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#99D1E9', height:4}}
        style={{ backgroundColor: '#ffffff' }}
        renderLabel={({route, color}) => (
          <Text style={{ color: 'black', margin: 8 }}>
            {route.title}
          </Text>
        )}
        pressColor='#cgcgcg' //???????????? ?????? ?????????,
      />
      </ScrollView>
  );

  return (
      <Container>
          <Content style= {{ backgroundColor: '#FCFCFC'}}>
          <View style={{ padding:16}}>
              <ScrollView>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                      <Icon.Button 
                          name='bell'
                          color='#DFDFDF' backgroundColor="#ffffff"
                          style={{marginLeft:-5,marginRight:-5}} // ?????? ?????? ???
                          onPress={()=>{}}
                          size={26}
                      />
                  </View>
                  <View style={{flex:3,padding:10,flexDirection:'column', alignItems:'center'}}>
                      <Image source={require('../login/profileImage/ProfileImage.jpg')}
                      style={{width:100, height:100, borderRadius:50}}/>
                      <Text style={{fontSize:17, fontWeight:'bold',paddingTop:7}}>{nickname}</Text>
                      <Text style={{padding:5}}>???????????? </Text>
                      <View style={{flexDirection:'row'}}>
                          <View style={{flex:1}}>
                              <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                  <View style={{alignItems:'center'}}>
                                      <Text style={{fontSize:17, fontWeight:'bold'}}>{codiFeedData.length}</Text>
                                      <Text style={{fontSize:12, color:'gray'}}>?????????</Text>
                                  </View>
                                  <View style={{alignItems:'center'}}>
                                      <Text style={{fontSize:17, fontWeight:'bold'}}>0</Text>
                                      <Text style={{fontSize:12, color:'gray'}}>?????????</Text>
                                  </View>
                                  <View style={{alignItems:'center'}}>
                                      <Text style={{fontSize:17, fontWeight:'bold'}}>0</Text>
                                      <Text style={{fontSize:12, color:'gray'}}>?????????</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </View>
                  <View>
                      <Icon.Button 
                          name='cog' 
                          color='#DFDFDF' backgroundColor="#ffffff"
                          style={{marginRight:-12,paddingLeft:10}}
                          onPress={()=>{}}
                          size={26}
                      />
                  </View>
              </View>
              <View style={{padding:6, borderColor:'#dfdfdf', borderTopWidth:1,borderBottomWidth:1}}>
                  <Text style={{fontSize:11}}>??????</Text> 
                  <FlatList
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false} 
                  data={myProfileStoryData} 
                  renderItem={renderItemStory} 
                  keyExtractor={item => String(item.id)}
                  />
              </View>
              <TabView //?????? View??? ????????? ?????????. 
                  renderTabBar={renderTabBar}
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
              />
          </ScrollView>
          </View>
      </Content>
  </Container>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        },
    scene: { // ??????, ????????? ?????? ?????????
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap' // ????????? row??? ???????????? ?????? ?????? ????????? ????????? ?????????.
    },
  storyimage: {
    width:60, 
    height:60, 
    borderRadius:52, 
    marginHorizontal:7
},
});