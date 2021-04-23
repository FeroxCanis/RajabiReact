import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Loader from 'react-loader-spinner';
import Navbar from '../Navbar';
import {
  Container,
  Main,
  Header,
  H2,
  Body,
  Block,
  BlockLeft,
  BlockRight,
  CourseName,
  Verify,
  NoOrder
} from './CartIndex';

const Cart = () => {

  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = 'parsur';

  useEffect(() => {
    axios.get('http://sararajabi.com/api/v1/cart/show', {
        headers: {
            'api_key': `${token}`,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(function (response) {
        setOrders(response.data.carts);
        setIsLoaded(true);
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);

  function deleter(id){
      axios.get(`http://sararajabi.com/api/v1/cart/delete/${id}`, {
          headers: {
              'api_key': `${token}`,
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      }
      ).then(function (response) {
          window.location.reload(false);
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  function submit(){
    axios.post('http://sararajabi.com/api/v1/order/store', {}, {
        headers: {
          'api_key': `${token}`,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(function (response) {
        window.location.replace(`${response.data.action}`);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  function noCart(){
    if(orders == 0){
        return <NoOrder>سفارشی ندارید</NoOrder>
    }
  }

  return isLoaded ? (
    <>
    <Navbar/>
    <Container>
      <Main>
        <Header>
          <H2>سبد خرید</H2>
        </Header>
        <Body>
        {noCart()}
        {orders.map(({course, id}, i) => {
          return (
              <Block key={i}>
                <BlockLeft onClick={()=>deleter(id)}>
                  <IoMdCloseCircleOutline/>
                </BlockLeft>
                <BlockRight>
                  <CourseName>
                    {course.name}
                  </CourseName>
                </BlockRight>
              </Block>
            )
        })}
        <div style={(orders == 0) ? {display:"none"} : {display:"unset"}}>
          <Verify onClick={()=>submit()}>
            <h3 dir="rtl">
              نهایی کردن خرید
            </h3>
          </Verify>
        </div>
        </Body>
      </Main>
    </Container>
    </>
  ) : (
    <>
    <Navbar/>
    <Container>
      <Main>
        <Header>
          <H2>سبد خرید</H2>
        </Header>
        <Body>
        <div style={{width:"100%", height:"100%", display:"flex"}}>
        <Loader
        type="Oval"
        color="#F4DD4F"
        height={150}
        width={150}
        timeout={3000} //3 secs
        style={{margin: "auto"}}
        />
        </div>
        </Body>
      </Main>
    </Container>
    </>
  )
}

export default Cart;
