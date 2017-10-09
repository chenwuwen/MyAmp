package com.kanyun.myamap;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.kanyun.myamap.dao.*") //添加该配置是因为有时候是springboot扫描不到mybatis的mapper的java文件，报错：Consider defining a bean of type ‘XXXXXXXX’，in your configuration.，同时dao层也要加上@mapper注解

public class MyamapApplication{

	public static void main(String[] args) {
		SpringApplication.run(MyamapApplication.class, args);
	}
}
