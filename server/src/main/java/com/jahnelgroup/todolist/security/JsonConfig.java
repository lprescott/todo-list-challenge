package com.jahnelgroup.todolist.security;

import java.util.Objects;
import java.util.Properties;

public class JsonConfig {

    Properties configFile;

    // On creation, get application.properties file as a stream
    public JsonConfig() {
        configFile = new Properties();
        try {
            configFile.load(Objects.requireNonNull(
                    this.getClass()
                            .getClassLoader()
                            .getResourceAsStream("application.properties")));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Get the value of the passed key
    public String getProperty(String key) {
        return this.configFile.getProperty(key);
    }
}
