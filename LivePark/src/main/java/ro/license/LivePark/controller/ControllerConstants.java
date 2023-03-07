package ro.license.LivePark.controller;

import ro.license.LivePark.entities.UserEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public interface ControllerConstants {

    String SIGN_IN = "/signin";
    String SIGN_UP = "/signup";
    String ERROR_DUPLICATE_USERNAME = "Error: Username already taken!";
    String ERROR_DUPLICATE_EMAIL = "Error: Email already taken!";
    String SUCCESSFULLY_REGISTERED = "Successfully registered!";

    static <T> List<T> convertFromIterableToList(Iterable<T> iterable) {
        if (iterable == null)
            return Collections.emptyList();

        List<T> list = new ArrayList<>();
        iterable.forEach(list::add);
        return list;
    }
}
