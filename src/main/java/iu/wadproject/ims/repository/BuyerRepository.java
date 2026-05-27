package iu.wadproject.ims.repository;

import iu.wadproject.ims.entity.Buyer;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, UUID> {
    
}