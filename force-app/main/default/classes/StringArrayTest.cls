public with sharing class StringArrayTest {

    public void generateStringArray(){
        List<Account> acctList = [select id from Account];
        system.debug(acctList);
    }
}