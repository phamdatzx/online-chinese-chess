package com.pixelwave.spring_boot.exception;

public class ValidationException extends RuntimeException {

  public ValidationException(String message) {
    super(message);
  }

}
