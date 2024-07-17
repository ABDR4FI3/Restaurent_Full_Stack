package com.example.mybackend.Controller;

import com.example.mybackend.DTO.MakeOrderDTO;
import com.example.mybackend.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController()
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;



    @PostMapping("/make")
    public ResponseEntity<Map<String, Object>> MakeOrder(@RequestBody MakeOrderDTO makeOrderDTO) {
        String token = makeOrderDTO.getToken(); //*get token
        long foodId = makeOrderDTO.getFoodId(); //*get foodId
        int qte = makeOrderDTO.getQte(); //* get Qte
        Map<String, Object> response = orderService.MakeOrder(token, foodId, qte);

        int statusCode = (int) response.get("response");
        return ResponseEntity.status(statusCode).body(response);
    }

    @GetMapping("/all")
    public Map<String, Object> GetOrders(@RequestParam("token") String token) {
        return orderService.getAllOrders(token);
    }


}
