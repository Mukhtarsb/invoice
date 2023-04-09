package com.example.invoiceback.repository;

import com.example.invoiceback.model.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface AddressRepository extends CrudRepository<Address, Long> {

}
