package com.example.invoiceback.service;

import com.example.invoiceback.model.Address;
import com.example.invoiceback.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AddressService {
    private AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void save(Address address) throws Exception {
        addressRepository.save(address);
    }
}
