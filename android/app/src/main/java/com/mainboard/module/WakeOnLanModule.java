package com.mainboard.module;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WakeOnLanModule extends ReactContextBaseJavaModule {
    public WakeOnLanModule(ReactApplicationContext context) {super(context);}

    public static final char SEPARATOR = ':';

    @Override
    public String getName() {
        return "WakeOnLanModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void wake(String mac, String ip, int port, Callback onError) {
        try {
            send(mac,ip,port);
        } catch (IOException e) {
            onError.invoke(e.toString());
        }
    }

    public static String send(String mac, String ip, int port) throws UnknownHostException, SocketException, IOException, IllegalArgumentException
    {
        // validate MAC and chop into array
        final String[] hex = validateMac(mac);

        // convert to base16 bytes
        final byte[] macBytes = new byte[6];
        for(int i=0; i<6; i++) {
            macBytes[i] = (byte) Integer.parseInt(hex[i], 16);
        }

        final byte[] bytes = new byte[102];

        // fill first 6 bytes
        for(int i=0; i<6; i++) {
            bytes[i] = (byte) 0xff;
        }
        // fill remaining bytes with target MAC
        for(int i=6; i<bytes.length; i+=macBytes.length) {
            System.arraycopy(macBytes, 0, bytes, i, macBytes.length);
        }

        // create socket to IP
        final InetAddress address = InetAddress.getByName(ip);
        final DatagramPacket packet = new DatagramPacket(bytes, bytes.length, address, port);
        final DatagramSocket socket = new DatagramSocket();
        socket.send(packet);
        socket.close();

        return hex[0]+SEPARATOR+hex[1]+SEPARATOR+hex[2]+SEPARATOR+hex[3]+SEPARATOR+hex[4]+SEPARATOR+hex[5];
    }

    public static String cleanMac(String mac) throws IllegalArgumentException
    {
        final String[] hex = validateMac(mac);

        StringBuffer sb = new StringBuffer();
        boolean isMixedCase = false;

        // check for mixed case
        for(int i=0; i<6; i++) {
            sb.append(hex[i]);
        }
        String testMac = sb.toString();
        if((testMac.toLowerCase().equals(testMac) == false) && (testMac.toUpperCase().equals(testMac) == false)) {
            isMixedCase = true;
        }

        sb = new StringBuffer();
        for(int i=0; i<6; i++) {
            // convert mixed case to lower
            if(isMixedCase == true) {
                sb.append(hex[i].toLowerCase());
            }else{
                sb.append(hex[i]);
            }
            if(i < 5) {
                sb.append(SEPARATOR);
            }
        }
        return sb.toString();
    }

    private static String[] validateMac(String mac) throws IllegalArgumentException
    {
        // error handle semi colons
        mac = mac.replace(";", ":");

        // attempt to assist the user a little
        String newMac = "";

        if(mac.matches("([a-zA-Z0-9]){12}")) {
            // expand 12 chars into a valid mac address
            for(int i=0; i<mac.length(); i++){
                if((i > 1) && (i % 2 == 0)) {
                    newMac += ":";
                }
                newMac += mac.charAt(i);
            }
        }else{
            newMac = mac;
        }

        // regexp pattern match a valid MAC address
        final Pattern pat = Pattern.compile("((([0-9a-fA-F]){2}[-:]){5}([0-9a-fA-F]){2})");
        final Matcher m = pat.matcher(newMac);

        if(m.find()) {
            String result = m.group();
            return result.split("(\\:|\\-)");
        }else{
            throw new IllegalArgumentException("Invalid MAC address");
        }
    }
}
