package ro.license.livepark.entities.car;

public enum EquipmentType {

    FIREEXTINGUISHER("fireExtinguisher"),
    FIRSTAIDKIT("firstAidKit");

    private final String type;

    EquipmentType(String type) {
        this.type = this.name();
    }

    public String getType() {
        return type;
    }


}
