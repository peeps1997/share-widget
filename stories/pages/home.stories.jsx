
import Home from "../../pages/index";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Grid } from "@nextui-org/react";

export default {
  title: "Pages/Home",
  component: Home,
};

export const HomePage = () => <Home />